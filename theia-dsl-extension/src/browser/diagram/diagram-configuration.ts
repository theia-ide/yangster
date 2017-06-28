/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { InstanceRegistry } from 'sprotty/lib/utils/registry'
import { injectable, Container, multiInject, optional } from "inversify"

export const DiagramConfiguration = Symbol('DiagramConfiguration')

export interface DiagramConfiguration {
    createContainer(widgetId: string): Container
    readonly diagramType: string
}

@injectable()
export class DiagramConfigurationRegistry extends InstanceRegistry<DiagramConfiguration> {
    constructor(@multiInject(DiagramConfiguration)@optional() diagramConfigs: DiagramConfiguration[]) {
        super()
        diagramConfigs.forEach(c => this.register(c.diagramType, c))
    }
}