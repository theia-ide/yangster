/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ActionMessage, ExportSvgAction } from 'sprotty/lib'
import { TheiaDiagramServer } from './theia-diagram-server'
import { NotificationType } from 'vscode-jsonrpc/lib/messages'
import { Location } from 'vscode-languageserver-types/lib/main'
import { LanguageClientContribution } from '@theia/languages/lib/browser'
import { EditorManager } from '@theia/editor/lib/browser'
import { TheiaFileSaver } from './theia-file-saver'
import URI from "@theia/core/lib/common/uri"

export interface OpenInTextEditorMessage {
    location: Location
    forceOpen: boolean
}

const acceptMessageType = new NotificationType<ActionMessage, void>('diagram/accept')
const didCloseMessageType = new NotificationType<string, void>('diagram/didClose')
const openInTextEditorMessageType = new NotificationType<OpenInTextEditorMessage, void>('diagram/openInTextEditor')

/**
 * Connects sprotty DiagramServers to a Theia LanguageClientContribution.
 *
 * Used to tunnel sprotty actions to and from the sprotty server through
 * the LSP.
 *
 * Instances bridge the gap between the sprotty DI containers (one per
 * diagram) and a specific language client from the Theia DI container
 * (one per application).
 */
export class TheiaSprottyConnector {

    private servers: TheiaDiagramServer[] = []

    constructor(private languageClientContribution: LanguageClientContribution,
                private fileSaver: TheiaFileSaver,
                private editorManager: EditorManager) {
        this.languageClientContribution.languageClient.then(
            lc => {
                lc.onNotification(acceptMessageType, this.receivedThroughLsp.bind(this))
                lc.onNotification(openInTextEditorMessageType, this.openInTextEditor.bind(this))
            }
        ).catch(
            err => console.error(err)
        )
    }

    connect(diagramServer: TheiaDiagramServer) {
        this.servers.push(diagramServer)
        diagramServer.connect(this)
    }

    disconnect(diagramServer: TheiaDiagramServer) {
        const index = this.servers.indexOf(diagramServer)
        if (index >= 0)
            this.servers.splice(index, 0)
        diagramServer.disconnect()
        this.languageClientContribution.languageClient.then(lc => lc.sendNotification(didCloseMessageType, diagramServer.clientId))
    }

    save(uri: string, action: ExportSvgAction) {
        this.fileSaver.save(uri, action)
    }

    openInTextEditor(message: OpenInTextEditorMessage) {
        const uri = new URI(message.location.uri)
        if (!message.forceOpen) {
            this.editorManager.editors.forEach(editorWidget => {
                const currentTextEditor = editorWidget.editor
                if (editorWidget.isVisible && uri.toString() === currentTextEditor.uri.toString()) {
                    currentTextEditor.cursor = message.location.range.start
                    currentTextEditor.revealRange(message.location.range)
                    currentTextEditor.selection = message.location.range
                }
            })
        } else {
            this.editorManager.open(uri).then(
                editorWidget => {
                    const editor = editorWidget.editor
                    editor.cursor = message.location.range.start
                    editor.revealRange(message.location.range)
                    editor.selection = message.location.range
                })
        }
    }

    sendThroughLsp(message: ActionMessage) {
        this.languageClientContribution.languageClient.then(lc => lc.sendNotification(acceptMessageType, message))
    }

    receivedThroughLsp(message: ActionMessage) {
        this.servers.forEach(element => {
            element.messageReceived(message)
        })
    }
}
