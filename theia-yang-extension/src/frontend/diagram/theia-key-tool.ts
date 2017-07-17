/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject, multiInject, optional } from 'inversify'
import { IActionDispatcher, KeyListener, KeyTool, SModelElement, TYPES } from 'sprotty/lib'
import { VNode } from 'snabbdom/vnode'

@injectable()
export class TheiaKeyTool extends KeyTool {

    constructor(@inject(TYPES.IActionDispatcher) actionDispatcher: IActionDispatcher,
        @multiInject(TYPES.KeyListener)@optional() protected keyListeners: KeyListener[] = []) {
        super(actionDispatcher, [])
    }

    decorate(vnode: VNode, element: SModelElement): VNode {
        return vnode
    }
}