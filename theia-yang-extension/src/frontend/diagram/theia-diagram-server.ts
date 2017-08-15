/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import {
    ILogger, SelectCommand, ActionHandlerRegistry, IActionDispatcher, SModelStorage, TYPES,
    ViewerOptions, DiagramServer, ActionMessage, ExportSvgAction, RequestModelAction, Action,
    ICommand
} from 'sprotty/lib'
import { TheiaSprottyConnector } from './theia-sprotty-connector'
import { injectable, inject } from "inversify"

/**
 * A sprotty DiagramServer that can be connected to a Theia language
 * server.
 *
 * This class is the sprotty side of the Theia/sprotty integration. It
 * is instantiated with the DI container of the sprotty diagram. Theia
 * services are available via the TheiaDiagramServerConnector.
 */
@injectable()
export class TheiaDiagramServer extends DiagramServer {

    protected connector: Promise<TheiaSprottyConnector>
    private resolveConnector: (server: TheiaSprottyConnector) => void
    private sourceUri: string

    constructor(@inject(TYPES.IActionDispatcher) public actionDispatcher: IActionDispatcher,
                @inject(TYPES.ActionHandlerRegistry) actionHandlerRegistry: ActionHandlerRegistry,
                @inject(TYPES.ViewerOptions) viewerOptions: ViewerOptions,
                @inject(TYPES.SModelStorage) storage: SModelStorage,
                @inject(TYPES.ILogger) logger: ILogger) {
        super(actionDispatcher, actionHandlerRegistry, viewerOptions, storage, logger)
        this.waitForConnector()
    }

    connect(connector: TheiaSprottyConnector): void {
        this.resolveConnector(connector)
    }

    disconnect(): void {
        this.waitForConnector()
    }

    private waitForConnector(): void {
        this.connector = new Promise<TheiaSprottyConnector>(resolve =>
            this.resolveConnector = resolve)
    }

    initialize(registry: ActionHandlerRegistry): void {
        super.initialize(registry)
        registry.register(SelectCommand.KIND, this)
    }

    handle(action: Action): void | ICommand {
        if (action instanceof RequestModelAction && action.options !== undefined)
            this.sourceUri = action.options.sourceUri
        return super.handle(action)
    }

    handleExportSvgAction(action: ExportSvgAction): void {
        this.connector.then(c => c.save(this.sourceUri, action))
    }

    sendMessage(message: ActionMessage) {
        this.connector.then(c => c.sendThroughLsp(message))
    }

    /**
     * made public
     */
    messageReceived(message: ActionMessage) {
        super.messageReceived(message)
    }
}
