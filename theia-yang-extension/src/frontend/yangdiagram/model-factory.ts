/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    SGraphFactory, SModelElementSchema, SModelRoot, SModelRootSchema, SParentElement, SChildElement,
    getBasicType, HtmlRoot, HtmlRootSchema, PreRenderedElement, PreRenderedElementSchema, SLabelSchema,
    getSubType
} from "sprotty/lib"
import { YangLabel, YangNode, ModuleNode } from './yang-models';

export class YangDiagramFactory extends SGraphFactory {

    createElement(schema: SModelElementSchema, parent?: SParentElement): SChildElement {
        if (this.isPreRenderedSchema(schema))
            return this.initializeChild(new PreRenderedElement(), schema, parent)
        else if (this.isNode(schema))
            if (getSubType(schema) === 'module')
                return this.initializeChild(new ModuleNode(), schema, parent)
            else
                return this.initializeChild(new YangNode(), schema, parent)
        if (this.isYangLabelSchema(schema))
            return this.initializeChild(new YangLabel(), schema, parent)
        else
            return super.createElement(schema, parent)
    }

    createRoot(schema: SModelRootSchema): SModelRoot {
        if (this.isHtmlRootSchema(schema))
            return this.initializeRoot(new HtmlRoot(), schema)
        else
            return super.createRoot(schema)
    }

    isHtmlRootSchema(schema: SModelElementSchema): schema is HtmlRootSchema {
        return getBasicType(schema) === 'html'
    }

    isPreRenderedSchema(schema: SModelElementSchema): schema is PreRenderedElementSchema {
        return getBasicType(schema) === 'pre-rendered'
    }

    isNode(schema: SModelElementSchema): schema is YangNode {
        return getBasicType(schema) === 'node'
    }

    isYangLabelSchema(schema: SModelElementSchema): schema is SLabelSchema {
        return getBasicType(schema) === 'ylabel'
    }


}