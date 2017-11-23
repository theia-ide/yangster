import { inject } from 'inversify';
import { CommandRegistry, MenuModelRegistry, SelectionService, Disposable } from '@theia/core/lib/common';
import { EDITOR_CONTEXT_MENU, TextEditorSelection } from '@theia/editor/lib/browser';
import { DefaultCommands } from '@theia/languages/lib/common';




export class ContextMenuCommands extends DefaultCommands {

    constructor(@inject(MenuModelRegistry) protected menuRegistry: MenuModelRegistry,
    @inject(CommandRegistry) commandRegistry: CommandRegistry,
    @inject(SelectionService) protected selectionProvider: SelectionService) {
        super(commandRegistry);
    }

    registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable {
        const execute = callback.bind(thisArg);
        const removeCommand = this.registry.registerCommand({ id: id }, {
            execute: () => {
                const selection = this.selectionProvider.selection
                if (TextEditorSelection.is(selection)) {
                    execute(selection.uri.toString())
                }
            },
            isVisible: () => this.isYangEditor()
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

    private isYangEditor(): boolean {
        return true;
    }
}