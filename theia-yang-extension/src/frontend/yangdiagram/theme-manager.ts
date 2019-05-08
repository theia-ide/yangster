import { Disposable } from "@theia/languages/lib/browser";
import { ThemeService, Theme } from "@theia/core/lib/browser/theming";
import { injectable } from "inversify";

const lightTheme = require('yang-sprotty/css/light/light.useable.css')
const darkTheme = require('yang-sprotty/css/dark/dark.useable.css')

@injectable()
export class ThemeManager implements Disposable {

    private disposable: Disposable;

    initialize() {
        const themeService = ThemeService.get()
        if (themeService instanceof ThemeService) {
            this.switchTheme(undefined, themeService.getCurrentTheme())
            this.disposable = themeService.onThemeChange(event => this.switchTheme(event.oldTheme, event.newTheme))
        }
    }

    private switchTheme(oldTheme: Theme | undefined , newTheme: Theme): void {
        if (oldTheme) {
            if (oldTheme.id === 'dark')
                darkTheme.unuse()
            else
                lightTheme.unuse()
        }
        if (newTheme.id === 'dark')
            darkTheme.use()
        else
            lightTheme.use()
    }

    dispose(): void {
        this.disposable.dispose()
    }
}