import { inject } from 'inversify';
import { CommandRegistry, MenuModelRegistry, Disposable } from '@theia/core/lib/common';
import { EDITOR_CONTEXT_MENU, EditorManager, EditorWidget } from '@theia/editor/lib/browser';
import { DefaultCommands } from '@theia/languages/lib/common';




export class ContextMenuCommands extends DefaultCommands {

    constructor(@inject(MenuModelRegistry) protected menuRegistry: MenuModelRegistry,
                @inject(CommandRegistry) commandRegistry: CommandRegistry,
                @inject(EditorManager) protected editorManager: EditorManager) {
        super(commandRegistry);
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