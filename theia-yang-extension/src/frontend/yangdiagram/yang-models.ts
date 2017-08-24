/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    boundsFeature, fadeFeature, hoverFeedbackFeature, popupFeature, SCompartment, selectFeature, layoutFeature,
    SNode, SLabel, expandFeature, Expandable, openFeature
} from "sprotty/lib"

export class YangNode extends SNode {
    cssClass: string
    trace: string | undefined

    hasFeature(feature: symbol): boolean {
        return feature === selectFeature || feature === boundsFeature
            || feature === layoutFeature || feature === fadeFeature || feature === hoverFeedbackFeature
            || feature === popupFeature || (feature == openFeature && this.trace !== undefined)
    }
}

export class ModuleNode extends YangNode implements Expandable {
    title: string
    expanded = false

    hasFeature(feature: symbol): boolean {
        return feature === expandFeature || super.hasFeature(feature)
    }
}


export class YangHeaderNode extends SCompartment {
}

export class YangLabel extends SLabel {
    trace: string | undefined
    
    hasFeature(feature: symbol) {
        return super.hasFeature(feature) || feature === selectFeature || (feature == openFeature && this.trace !== undefined)
    }
}
