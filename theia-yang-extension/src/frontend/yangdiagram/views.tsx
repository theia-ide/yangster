/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    RenderingContext,
    SNode,
    RectangularNodeView,
    SEdge,
    PolylineEdgeView,
    angle,
    Point,
    toDegrees
} from "sprotty/lib"
import { VNode } from "snabbdom/vnode"
import * as snabbdom from "snabbdom-jsx"

const JSX = {createElement: snabbdom.svg}

/**
 * A very simple example node consisting of a plain circle.
 */
export class ClassNodeView extends RectangularNodeView {
    render(node: SNode, context: RenderingContext): VNode {
        return <g class-node={true}>
            <rect class-node={true} class-selected={node.selected} class-mouseover={node.hoverFeedback}
                  x={0} y={0}
                  width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}/>
            {context.renderChildren(node)}
        </g>
    }
}

export class ModuleNodeView extends RectangularNodeView {
    render(node: SNode, context: RenderingContext): VNode {
        const titleHeight = 30
        const titleWidth = node.bounds.width * 0.4

        return <g class-node={true} class-module={true} class-mouseover={node.hoverFeedback}>
            <path class-title={true} stroke-miterlimit="3"
                  d={"m0,-" + titleHeight + " l" + titleWidth + ",0 " +
                  "l" + titleHeight + "," + titleHeight + " l-" + (titleHeight + titleWidth) + ",0 Z"}/>
            {/*<text class-heading={true} class-label={true} y="-5" x="5">{node.title}</text>*/}
            <rect class-body={true} class-selected={node.selected}
                  x={0} y={0}
                  width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}/>
            {context.renderChildren(node)}
        </g>
    }
}

export class NoteView extends RectangularNodeView {
    render(node: SNode, context: RenderingContext): VNode {
        return <g class-note={true} class-mouseover={node.hoverFeedback}>
            <path class-front={true} d="M 0,0 l 15,0 l 0,10 l 10,0 l 0,25 l -25,0 Z" fill="#FFEB8A"/>
            <path class-noteEdge={true} d="M 15,0 l 0,10 l 10,0 Z" fill="#FFCC40"/>
        </g>
    }
}

export class CompositionEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2]
        const p2 = segments[segments.length - 1]
        const r = 10
        const rhombStr = "M 0,0 l" + r + "," + (r / 2) + " l" + r + ",-" + (r / 2) + " l-" + r + ",-" + (r / 2) + " l-" + r + "," + (r / 2) + " Z"
        return [
            <path class-edge={true} class-composition={true} d={rhombStr}
                  transform={`rotate(${toDegrees(angle(p1, p2))} ${p1.x} ${p1.y}) translate(${p1.x} ${p1.y})`}/>
        ]
    }
}

export class DashedEdgeView extends PolylineEdgeView {
    protected renderLine(edge: SEdge, segments: Point[], context: RenderingContext): VNode {
        const firstPoint = segments[0]
        let path = `M ${firstPoint.x},${firstPoint.y}`
        for (let i = 1; i < segments.length; i++) {
            const p = segments[i]
            path += ` L ${p.x},${p.y}`
        }
        return <path class-edge={true} class-dashed={true} d={path}/>
    }
}

export class ImportEdgeView extends DashedEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2]
        const p2 = segments[segments.length - 1]
        return [
            <path class-edge={true} d="M 10,-4 L 0,0 L 10,4"
                  transform={`rotate(${toDegrees(angle(p2, p1))} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`}/>
        ]
    }
}

export class UsesEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2]
        const p2 = segments[segments.length - 1]
        return [
            <path class-edge={true} d="M 10,-4 L 0,0 L 10,4"
                  transform={`rotate(${toDegrees(angle(p2, p1))} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`}/>
        ]
    }
}

