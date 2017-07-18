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
    toDegrees, IView
} from "sprotty/lib"
import { VNode } from "snabbdom/vnode"
import * as snabbdom from "snabbdom-jsx"
import { YangHeaderNode, YangNode } from "./yang-models"

const JSX = {createElement: snabbdom.svg}

export class ClassNodeView extends RectangularNodeView {
    render(node: YangNode, context: RenderingContext): VNode {
        let n = <g class-node={true}
                   class-choice={node.cssClass === 'choice'}
                   class-case={node.cssClass === 'case'}
                   class-augment={node.cssClass === 'augment'}
                   class-list={node.cssClass === 'list'}
                   class-container={node.cssClass === 'container'}
                   class-moduleNode={node.cssClass === 'moduleNode'}
                   class-submodule={node.cssClass === 'submodule'}
                   class-grouping={node.cssClass === 'grouping'}
                   class-identity={node.cssClass === 'identity'}
                   class-typedef={node.cssClass === 'typedef'}>
            <rect class-selected={node.selected} class-mouseover={node.hoverFeedback}
                  x={0} y={0}
                  width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}/>
            {/*<rect x={0} y={0}  class-headerBg={true}*/}
            {/*width={Math.max(0, node.bounds.width)} height='41'/>*/}
            {context.renderChildren(node)}
        </g>

        return n
    }
}

export class YangClassHeaderView implements IView {
    render(model: YangHeaderNode, context: RenderingContext): VNode {
        const translate = `translate(${model.bounds.x}, ${model.bounds.y})`
        const radius = 13
        const headerHeight = radius * 3
        const headerPosOffset = 10
        const circlePosOffset = (headerHeight/2 - radius) + headerPosOffset/2 - 2

        return <g transform={translate} class-comp="{true}" class-header={true}>
            <rect x={-(headerPosOffset)} y={-(headerPosOffset)} width={(model.parent as SNode).size.width}
                  height={headerHeight}
                  class-headerBg={true}></rect>
            <circle class-tagBg={true} r={radius} cx={circlePosOffset} cy={circlePosOffset}></circle>
            <text class-tagLabel={true} x={headerPosOffset/2 - 3} y={radius - 1 + headerPosOffset/2}>{model.tag}</text>
            <text class-label={true} x="32" y="16">{model.label}</text>
        </g>
    }
}

export class ModuleNodeView extends RectangularNodeView {
    render(node: SNode, context: RenderingContext): VNode {
        // const titleHeight = 30
        // const titleWidth = node.bounds.width * 0.4

        return <g class-node={true} class-module={true} class-mouseover={node.hoverFeedback}>
            {/*<path class-title={true} stroke-miterlimit="3"*/}
            {/*d={"m0,-" + titleHeight + " l" + titleWidth + ",0 " +*/}
            {/*"l" + titleHeight + "," + titleHeight + " l-" + (titleHeight + titleWidth) + ",0 Z"}/>*/}
            <rect class-body={true} class-selected={node.selected}
                  x={0} y={0} rx="5" ry="5"
                  width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)}/>
            {context.renderChildren(node)}
        </g>
    }
}

export class ChoiceNodeView extends RectangularNodeView {
    render(model: SNode, context: RenderingContext): VNode {

        const width = model.size.width === -1 ? 0 : model.size.width
        const height = model.size.height === -1 ? 0 : model.size.height
        const rhombStr = "M -" + width/2 + "," + height/2 + " l " + width + "," + height + " l " + width + ",-" + height + " l -" + width + ",-" + height + "l -" + width + "," + height

        return <g class-comp="{true}" class-choice={true}>
            <path d={rhombStr} class-choice={true}></path>
            {context.renderChildren(model)}
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
        const p1 = segments[0]
        const p2 = segments[1]
        const r = 6
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

export class ArrowEdgeView extends PolylineEdgeView {
    protected renderAdditionals(edge: SEdge, segments: Point[], context: RenderingContext): VNode[] {
        const p1 = segments[segments.length - 2]
        const p2 = segments[segments.length - 1]
        return [
            <path class-edge={true} d="M 10,-4 L 0,0 L 10,4"
                  transform={`rotate(${toDegrees(angle(p2, p1))} ${p2.x} ${p2.y}) translate(${p2.x} ${p2.y})`}/>
        ]
    }
}

