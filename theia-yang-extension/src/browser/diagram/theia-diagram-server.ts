/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    ILogger, SelectCommand, ActionHandlerRegistry, IActionDispatcher, SModelStorage, TYPES,
    ViewerOptions, DiagramServer
} from 'sprotty/lib'
import { TheiaDiagramServerConnector } from './theia-diagram-server-connector'
import { injectable, inject } from "inversify"

@injectable()
export class TheiaDiagramServer extends DiagramServer {

    protected connector: TheiaDiagramServerConnector

    constructor(@inject(TYPES.IActionDispatcher) public actionDispatcher: IActionDispatcher,
                @inject(TYPES.ActionHandlerRegistry) actionHandlerRegistry: ActionHandlerRegistry,
                @inject(TYPES.ViewerOptions) viewerOptions: ViewerOptions,
                @inject(TYPES.SModelStorage) storage: SModelStorage,
                @inject(TYPES.ILogger) logger: ILogger) {
        super(actionDispatcher, actionHandlerRegistry, viewerOptions, storage, logger)
    }

    initialize(registry: ActionHandlerRegistry): void {
        super.initialize(registry)
        registry.register(SelectCommand.KIND, this)
    }

    connect(connector: TheiaDiagramServerConnector)  {
        this.connector = connector
    }

    sendMessage(message: string) {
        this.connector.sendMessage(message)
    }

    messageReceived(message: string) {
        super.messageReceived(message)
    }
}
