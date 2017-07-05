/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiagramConfigurationRegistry } from './diagram-configuration'
import { ActionMessage, TYPES } from 'sprotty/lib'
import { TheiaDiagramServer } from './theia-diagram-server'
import { NotificationType } from 'vscode-jsonrpc/lib/messages'
import { LanguageClientContribution } from 'theia-core/lib/languages/browser'
import { injectable, inject } from "inversify"

const actionMessageType = new NotificationType<ActionMessage, void>('diagram/accept')

@injectable()
export class TheiaDiagramServerConnector {

    private servers: TheiaDiagramServer[] = []

    constructor(@inject(LanguageClientContribution) private languageClientContribution: LanguageClientContribution,
                @inject(DiagramConfigurationRegistry) private diagramConfigurationRegistry: DiagramConfigurationRegistry) {
        this.languageClientContribution.languageClient.then(
            lc => {
                lc.onNotification(actionMessageType, this.actionMessageReceived.bind(this))
            }
        ).catch(
            err => console.error(err)
        )
    }

    createDiagramServer(widgetId: string, diagramType: string): TheiaDiagramServer {
        const diagramConfiguration = this.diagramConfigurationRegistry.get(diagramType)
        const newServer = diagramConfiguration.createContainer(widgetId).get<TheiaDiagramServer>(TYPES.ModelSource)
        newServer.connect(this)
        this.servers.push(newServer)
        return newServer
    }

    sendMessage(message: ActionMessage) {
        this.languageClientContribution.languageClient.then(lc => lc.sendNotification(actionMessageType, message))
    }

    actionMessageReceived(message: ActionMessage) {
        this.servers.forEach(element => {
            element.messageReceived(message)
        })
    }
}

