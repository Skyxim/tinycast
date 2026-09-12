import SwiftUI

/// Starts a window drag on mouse-down — the hosting view otherwise eats the click first.
struct WindowDragHandle: NSViewRepresentable {
    var onBegan: () -> Void
    var onEnded: () -> Void

    func makeNSView(context: Context) -> NSView { DragView() }

    func updateNSView(_ nsView: NSView, context: Context) {
        (nsView as? DragView)?.bind(onBegan: onBegan, onEnded: onEnded)
    }
}

extension View {
    /// Marks a region as a window-drag handle; an overlay, so it wins the hit-test race.
    func windowDraggable(
        _ enabled: Bool,
        onBegan: @escaping () -> Void = {},
        onEnded: @escaping () -> Void = {}
    ) -> some View {
        overlay {
            if enabled { WindowDragHandle(onBegan: onBegan, onEnded: onEnded) }
        }
    }
}

/// Drags past the visible text; declines over it, so a click there edits/selects normally.
struct TextTrailingDragHandle: NSViewRepresentable {
    var text: String
    var font: NSFont
    var onBegan: () -> Void
    var onEnded: () -> Void
    var onClick: () -> Void

    func makeNSView(context: Context) -> NSView { TextTailDragView() }

    func updateNSView(_ nsView: NSView, context: Context) {
        guard let view = nsView as? TextTailDragView else { return }
        view.text = text
        view.font = font
        view.bind(onBegan: onBegan, onEnded: onEnded, onClick: onClick)
    }
}

/// Tracks the drag itself: `performDrag(with:)` returns at once, never saying when the mouse rose.
private class DragView: NSView {
    private var onBegan: (() -> Void)?
    private var onEnded: (() -> Void)?
    private var onClick: (() -> Void)?
    /// Slop before a press is a drag, so a click that never moves stays a click.
    private static let dragSlop: CGFloat = 3

    func bind(
        onBegan: @escaping () -> Void, onEnded: @escaping () -> Void,
        onClick: (() -> Void)? = nil
    ) {
        self.onBegan = onBegan
        self.onEnded = onEnded
        self.onClick = onClick
    }

    override func mouseDown(with event: NSEvent) {
        guard let window else { return }
        // Deltas off `mouseLocation`, so no view or window coordinate conversion can drift.
        let origin = window.frame.origin
        let start = NSEvent.mouseLocation
        var dragging = false
        window.trackEvents(
            matching: [.leftMouseDragged, .leftMouseUp], timeout: NSEvent.foreverDuration,
            mode: .eventTracking
        ) { tracked, stop in
            guard let tracked, tracked.type != .leftMouseUp else {
                stop.pointee = true
                return
            }
            let mouse = NSEvent.mouseLocation
            guard dragging || hypot(mouse.x - start.x, mouse.y - start.y) > Self.dragSlop else {
                return
            }
            if !dragging {
                dragging = true
                self.onBegan?()
            }
            window.setFrameOrigin(
                CGPoint(x: origin.x + mouse.x - start.x, y: origin.y + mouse.y - start.y))
        }
        // A press that never moved was a click on whatever the handle covers, not a drag.
        if dragging { onEnded?() } else { onClick?() }
    }
}

/// Claims only the run of the field past its text, measured in the font the field draws with.
private final class TextTailDragView: DragView {
    var text = ""
    var font: NSFont = .systemFont(ofSize: NSFont.systemFontSize)
    /// Slack so a click right at the text's trailing edge still edits rather than drags.
    private static let edgeSlack: CGFloat = 4

    override func hitTest(_ point: NSPoint) -> NSView? {
        // `point` is in the superview's space; the text is measured from our own leading edge.
        let local = convert(point, from: superview)
        guard bounds.contains(local) else { return nil }
        let textWidth = (text as NSString).size(withAttributes: [.font: font]).width
        return local.x > textWidth + Self.edgeSlack ? super.hitTest(point) : nil
    }
}
