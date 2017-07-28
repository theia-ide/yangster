/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ScrollMouseListener, SModelElement, Action, findParentByFeature, isViewport } from "sprotty/lib";

export class YangsterScrollMouseListener extends ScrollMouseListener {

    mouseDown(target: SModelElement, event: MouseEvent): Action[] {
        if (event.button === 0) {
            const viewport = findParentByFeature(target, isViewport)
            if (viewport)
                this.lastScrollPosition = {x: event.pageX, y: event.pageY}
            else
                this.lastScrollPosition = undefined
        }
        return []
    }
}
