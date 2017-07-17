/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { CenterAction, FitToScreenAction, RequestExportSvgAction, UndoAction, RedoAction, SelectAction } from 'sprotty/lib'
import { DiagramWidget } from './diagram-widget'
import { injectable, inject } from 'inversify'
import { MAIN_MENU_BAR, MenuContribution, MenuModelRegistry, CommandContribution,
         CommandHandler, CommandRegistry, CommonCommands } from 'theia-core/lib/application/common'
import { ApplicationShell } from 'theia-core/lib/application/browser/shell'
import { FrontendApplication } from 'theia-core/lib/application/browser/frontend-application'

export namespace DiagramCommands {
    export const CENTER = 'diagram:center'
    export const FIT = 'diagram:fit'
    export const EXPORT = 'diagram:export'
    export const SELECT_ALL = 'diagram.selectAll'
}

export namespace DiagramMenus {
    export const DIAGRAM = [MAIN_MENU_BAR, "3_diagram"]
}

@injectable()
export class DiagramMenuContribution implements MenuContribution {

    registerMenus(registry: MenuModelRegistry) {
        registry.registerSubmenu([MAIN_MENU_BAR], DiagramMenus.DIAGRAM[1], "Diagram")

        registry.registerMenuAction(DiagramMenus.DIAGRAM, {
            commandId: DiagramCommands.CENTER
        })
        registry.registerMenuAction(DiagramMenus.DIAGRAM, {
            commandId: DiagramCommands.FIT
        })
        registry.registerMenuAction(DiagramMenus.DIAGRAM, {
            commandId: DiagramCommands.EXPORT
        })
    }
}

export class DiagramCommandHandler implements CommandHandler {

    constructor(protected readonly shell: ApplicationShell,
                protected readonly doExecute: (diagram: DiagramWidget) => any) {
    }

    execute(...args: any[]) {
        return this.isEnabled()
            ? this.doExecute(this.shell.currentWidget as DiagramWidget)
            : undefined
    }

    isEnabled(): boolean {
        return this.shell.currentWidget instanceof DiagramWidget
    }
}

@injectable()
export class DiagramCommandContribution implements CommandContribution {
    constructor(@inject(FrontendApplication) protected readonly application: FrontendApplication) {
    }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand({
            id: DiagramCommands.CENTER,
            label: 'Center'
        })
        registry.registerCommand({
            id: DiagramCommands.FIT,
            label: 'Fit to screen'
        })
        registry.registerCommand({
            id: DiagramCommands.EXPORT,
            label: 'Export'
        })
        registry.registerCommand({
            id: DiagramCommands.SELECT_ALL,
            label: 'Select all'
        })

        registry.registerHandler(
            DiagramCommands.CENTER,
            new DiagramCommandHandler(this.application.shell, widget =>
                widget.diagramServer.actionDispatcher.dispatch(new CenterAction([]))
            )
        )
        registry.registerHandler(
            DiagramCommands.FIT,
            new DiagramCommandHandler(this.application.shell, widget =>
                widget.diagramServer.actionDispatcher.dispatch(new FitToScreenAction([]))
            )
        )
        registry.registerHandler(
            DiagramCommands.EXPORT,
            new DiagramCommandHandler(this.application.shell, widget =>
                widget.diagramServer.actionDispatcher.dispatch(new RequestExportSvgAction())
            )
        )
        registry.registerHandler(
            DiagramCommands.SELECT_ALL,
            new DiagramCommandHandler(this.application.shell, widget => {
                const action = new SelectAction([], [])
                action.selectAll = true
                widget.diagramServer.actionDispatcher.dispatch(action)
            })
        )
        registry.registerHandler(
            CommonCommands.EDIT_UNDO,
            new DiagramCommandHandler(this.application.shell, widget =>
                widget.diagramServer.actionDispatcher.dispatch(new UndoAction())
            )
        )
        registry.registerHandler(
            CommonCommands.EDIT_REDO,
            new DiagramCommandHandler(this.application.shell, widget =>
                widget.diagramServer.actionDispatcher.dispatch(new RedoAction())
            )
        )
    }
}