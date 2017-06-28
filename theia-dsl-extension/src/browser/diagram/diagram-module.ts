/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from 'inversify'
import { TheiaDiagramServerConnector } from './theia-diagram-server-connector'
import { DiagramWidgetRegistry } from "./diagram-widget-registry"
import { DiagramConfigurationRegistry } from "./diagram-configuration"

export const diagramModule = new ContainerModule(bind => {
    bind(TheiaDiagramServerConnector).toSelf().inSingletonScope()
    bind(DiagramWidgetRegistry).toSelf().inSingletonScope()
    bind(DiagramConfigurationRegistry).toSelf().inSingletonScope()
})
