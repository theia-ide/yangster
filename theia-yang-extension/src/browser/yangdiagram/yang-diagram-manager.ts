/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiagramManagerImpl } from "../diagram/diagram-manager"
import { injectable } from "inversify"

@injectable()
export class YangDiagramManager extends DiagramManagerImpl {
    readonly diagramType = 'yang-diagram'
    readonly iconClass = 'fa fa-microchip'

    get label() {
        return 'Yang diagram'
    }
}