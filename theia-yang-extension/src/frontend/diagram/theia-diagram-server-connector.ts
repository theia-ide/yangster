/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiagramConfigurationRegistry } from './diagram-configuration'
import { ActionMessage, TYPES, ExportSvgAction } from 'sprotty/lib'
import { TheiaDiagramServer } from './theia-diagram-server'
import { NotificationType } from 'vscode-jsonrpc/lib/messages'
import { LanguageClientContribution } from 'theia-core/lib/languages/browser'
import { TheiaFileSaver } from './theia-file-saver'

const actionMessageType = new NotificationType<ActionMessage, void>('diagram/accept')

export class TheiaDiagramServerConnector {

    private servers: TheiaDiagramServer[] = []

    constructor(private languageClientContribution: LanguageClientContribution,
                private diagramConfigurationRegistry: DiagramConfigurationRegistry,
                private fileSaver: TheiaFileSaver) {
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

    save(action: ExportSvgAction) {
        this.fileSaver.save(action)
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

