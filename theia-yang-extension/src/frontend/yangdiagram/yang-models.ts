/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    boundsFeature, fadeFeature, hoverFeedbackFeature, popupFeature, SCompartment, selectFeature, layoutFeature,
    SNode, SLabel
} from "sprotty/lib"

export class YangNode extends SNode {
    cssClass: string

    hasFeature(feature: symbol): boolean {
        return feature === selectFeature || feature === boundsFeature
            || feature === layoutFeature || feature === fadeFeature || feature === hoverFeedbackFeature
            || feature === popupFeature
    }

}

export class ModuleNodeModel extends YangNode {
    title: string
}


export class YangHeaderNode extends SCompartment {
}

export class YangLabel extends SLabel {

    hasFeature(feature: symbol) {
        return super.hasFeature(feature) || feature === selectFeature
    }
}