/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { EditorManager } from 'theia-core/lib/editor/browser'
import { TextDocumentPositionParams, Location } from 'vscode-base-languageclient/lib/services'
import { DiagramConfigurationRegistry } from './diagram-configuration'
import { TYPES } from 'sprotty/lib'
import { TheiaDiagramServer } from './theia-diagram-server'
import { NotificationType } from 'vscode-jsonrpc/lib/messages'
import { LanguageClientContribution } from 'theia-core/lib/languages/browser'
import { injectable, inject } from "inversify"
import URI from "theia-core/lib/application/common/uri"

const actionMessageType = new NotificationType<string, void>('diagram/onAction')
const openInTextEditorType = new NotificationType<Location, void>('diagram/openInTextEditor')
const textPositionMessageType = new NotificationType<TextDocumentPositionParams, void>('diagram/update')

@injectable()
export class TheiaDiagramServerConnector {

    private servers: TheiaDiagramServer[] = []

    constructor(@inject(LanguageClientContribution) private languageClientContribution: LanguageClientContribution,
                @inject(DiagramConfigurationRegistry) private diagramConfigurationRegistry: DiagramConfigurationRegistry,
                @inject(EditorManager) private editorManager: EditorManager) {
        this.languageClientContribution.languageClient.then(
            lc => {
                lc.onNotification(actionMessageType, this.actionMessageReceived.bind(this))
                lc.onNotification(openInTextEditorType, this.openInTextEditorReceived.bind(this))
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

    sendMessage(message: string) {
        this.languageClientContribution.languageClient.then(lc => lc.sendNotification(actionMessageType, message))
    }

    sendTextPosition(params: TextDocumentPositionParams) {
        this.languageClientContribution.languageClient.then(lc => lc.sendNotification(textPositionMessageType, params))
    }

    openInTextEditorReceived(location: Location) {
        const uri = new URI(location.uri)
        this.editorManager.open(uri).then(
            editorWidget => {
                const editor = editorWidget.editor
                editor.selection = location.range
                editor.cursor = location.range.start
                editor.revealRange(location.range)
            }
        )
    }

    actionMessageReceived(message: string) {
        this.servers.forEach(element => {
            element.messageReceived(message)
        })
    }
}

