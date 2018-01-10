/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify';
import { CommandRegistry, MenuModelRegistry, Disposable } from '@theia/core/lib/common';
import { EDITOR_CONTEXT_MENU, EditorManager, EditorWidget } from '@theia/editor/lib/browser';

@injectable()
export class ContextMenuCommands {

    constructor(@inject(MenuModelRegistry) protected menuRegistry: MenuModelRegistry,
                @inject(CommandRegistry) protected registry: CommandRegistry,
                @inject(EditorManager) protected editorManager: EditorManager) {
    }

    registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable {
        const execute = callback.bind(thisArg);
        const removeCommand = this.registry.registerCommand({ id: id }, {
            execute: () => {
                const currentEditor = this.editorManager.currentEditor
                if (this.isYangEditor(currentEditor)) {
                    execute(currentEditor.editor.document.uri)
                }
            },
            isVisible: () => this.isYangEditor(this.editorManager.currentEditor)
        });
        const removeMenu = this.menuRegistry.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_yang"), {
            commandId: id,
            label: id
        });
        return {
            dispose : () => {
                removeCommand.dispose()
                removeMenu.dispose()
            }
        }
    }

    private isYangEditor(widget: EditorWidget | undefined): widget is EditorWidget {
        if (widget)
            return widget.editor.document.languageId === 'yang';
        else
            return false;
    }
}