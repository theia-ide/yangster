"use strict";
/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var uri_1 = require("@theia/core/lib/common/uri");
var logger_1 = require("@theia/core/lib/common/logger");
var editor_manager_1 = require("@theia/editor/lib/browser/editor-manager");
var disposable_1 = require("@theia/core/lib/common/disposable");
var semantic_highlighting_service_1 = require("@theia/editor/lib/browser/semantic-highlight/semantic-highlighting-service");
var monaco_editor_1 = require("./monaco-editor");
var monaco_editor_service_1 = require("./monaco-editor-service");
/**
 * A helper class for grouping information about a decoration type that has
 * been registered with the editor service.
 */
var DecorationTypeInfo = /** @class */ (function () {
    function DecorationTypeInfo() {
    }
    return DecorationTypeInfo;
}());
var MonacoSemanticHighlightingService = /** @class */ (function (_super) {
    __extends(MonacoSemanticHighlightingService, _super);
    function MonacoSemanticHighlightingService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.decorations = new Map();
        _this.toDisposeOnEditorClose = new Map();
        _this.toDisposeOnUnregister = new Map();
        // laguage id -> (scope index -> decoration type)
        _this.decorationTypes = new Map();
        _this.lastDecorationTypeId = 0;
        return _this;
    }
    MonacoSemanticHighlightingService.prototype.nextDecorationTypeKey = function () {
        return 'MonacoSemanticHighlighting' + (++this.lastDecorationTypeId);
    };
    MonacoSemanticHighlightingService.prototype.registerDecorationTypesForLanguage = function (languageId) {
        var scopes = this.scopes.get(languageId);
        if (scopes) {
            var decorationTypes = new Map();
            for (var index = 0; index < scopes.length; index++) {
                var modelDecoration = this.toDecorationType(scopes[index]);
                if (modelDecoration) {
                    decorationTypes.set(index, modelDecoration);
                }
            }
            this.decorationTypes.set(languageId, decorationTypes);
        }
    };
    MonacoSemanticHighlightingService.prototype.removeDecorationTypesForLanguage = function (languageId) {
        var e_1, _a;
        var decorationTypes = this.decorationTypes.get(languageId);
        if (!decorationTypes) {
            this.logger.warn("No decoration types are registered for language: " + languageId);
            return;
        }
        try {
            for (var decorationTypes_1 = __values(decorationTypes), decorationTypes_1_1 = decorationTypes_1.next(); !decorationTypes_1_1.done; decorationTypes_1_1 = decorationTypes_1.next()) {
                var _b = __read(decorationTypes_1_1.value, 2), decorationType = _b[1];
                this.monacoEditorService.removeDecorationType(decorationType.key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (decorationTypes_1_1 && !decorationTypes_1_1.done && (_a = decorationTypes_1.return)) _a.call(decorationTypes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    MonacoSemanticHighlightingService.prototype.refreshDecorationTypesForLanguage = function (languageId) {
        var e_2, _a;
        var decorationTypes = this.decorationTypes.get(languageId);
        var scopes = this.scopes.get(languageId);
        if (!decorationTypes || !scopes) {
            this.logger.warn("No decoration types are registered for language: " + languageId);
            return;
        }
        try {
            for (var decorationTypes_2 = __values(decorationTypes), decorationTypes_2_1 = decorationTypes_2.next(); !decorationTypes_2_1.done; decorationTypes_2_1 = decorationTypes_2.next()) {
                var _b = __read(decorationTypes_2_1.value, 2), scope = _b[0], decorationType = _b[1];
                // Pass in the existing key to associate the new color with the same
                // decoration type, thereby reusing it.
                var newDecorationType = this.toDecorationType(scopes[scope], decorationType.key);
                if (newDecorationType) {
                    decorationType.options = newDecorationType.options;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (decorationTypes_2_1 && !decorationTypes_2_1.done && (_a = decorationTypes_2.return)) _a.call(decorationTypes_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MonacoSemanticHighlightingService.prototype.register = function (languageId, scopes) {
        var _this = this;
        var result = _super.prototype.register.call(this, languageId, scopes);
        this.registerDecorationTypesForLanguage(languageId);
        var disposable = this.themeService().onThemeChange(function () {
            // When the theme changes, refresh the decoration types to reflect
            // the colors for the old theme.
            // Note that we do not remove the old decoration types and add new ones.
            // The new ones would have different class names, and we'd have to
            // update all open editors to use the new class names.
            _this.refreshDecorationTypesForLanguage(languageId);
        });
        this.toDisposeOnUnregister.set(languageId, disposable);
        return result;
    };
    MonacoSemanticHighlightingService.prototype.unregister = function (languageId) {
        _super.prototype.unregister.call(this, languageId);
        this.removeDecorationTypesForLanguage(languageId);
        var disposable = this.toDisposeOnUnregister.get(languageId);
        if (disposable) {
            disposable.dispose();
        }
        this.decorationTypes.delete(languageId);
        this.toDisposeOnUnregister.delete(languageId);
    };
    MonacoSemanticHighlightingService.prototype.toDecorationType = function (scopes, reuseKey) {
        var e_3, _a;
        var key = reuseKey || this.nextDecorationTypeKey();
        try {
            // TODO: why for-of? How to pick the right scope? Is it fine to get the first element (with the narrowest scope)?
            for (var scopes_1 = __values(scopes), scopes_1_1 = scopes_1.next(); !scopes_1_1.done; scopes_1_1 = scopes_1.next()) {
                var scope = scopes_1_1.value;
                var tokenTheme = this.tokenTheme();
                var metadata = tokenTheme.match(undefined, scope);
                // Don't use the inlineClassName from the TokenMetadata, because this
                // will conflict with styles used for TM scopes
                // (https://github.com/Microsoft/monaco-editor/issues/1070).
                // Instead, get the token color, use registerDecorationType() to cause
                // monaco to allocate a new inlineClassName for that color, and use
                // resolveDecorationOptions() to get an IModelDecorationOptions
                // containing that inlineClassName.
                var colorIndex = monaco.modes.TokenMetadata.getForeground(metadata);
                var color = tokenTheme.getColorMap()[colorIndex];
                // If we wanted to support other decoration options such as font style,
                // we could include them here.
                var options = {
                    color: color.toString(),
                };
                this.monacoEditorService.registerDecorationType(key, options);
                return {
                    key: key,
                    options: this.monacoEditorService.resolveDecorationOptions(key, false)
                };
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (scopes_1_1 && !scopes_1_1.done && (_a = scopes_1.return)) _a.call(scopes_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return undefined;
    };
    MonacoSemanticHighlightingService.prototype.decorate = function (languageId, uri, ranges) {
        return __awaiter(this, void 0, void 0, function () {
            var editor, key, newDecorations, oldDecorations, newState, decorationIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editor(uri)];
                    case 1:
                        editor = _a.sent();
                        if (!editor) {
                            return [2 /*return*/];
                        }
                        key = uri.toString();
                        if (!this.toDisposeOnEditorClose.has(key)) {
                            this.toDisposeOnEditorClose.set(key, new disposable_1.DisposableCollection(editor.onDispose(function () { return _this.deleteDecorations(key, editor); })));
                        }
                        newDecorations = ranges.map(function (range) { return _this.toDecoration(languageId, range); });
                        oldDecorations = this.oldDecorations(key, editor, ranges);
                        newState = editor.deltaDecorations({
                            newDecorations: newDecorations,
                            oldDecorations: oldDecorations
                        });
                        decorationIds = this.decorationIds(key);
                        newState.forEach(function (id) { return decorationIds.add(id); });
                        this.decorations.set(key, decorationIds);
                        return [2 /*return*/];
                }
            });
        });
    };
    MonacoSemanticHighlightingService.prototype.dispose = function () {
        Array.from(this.toDisposeOnEditorClose.values()).forEach(function (disposable) { return disposable.dispose(); });
    };
    MonacoSemanticHighlightingService.prototype.decorationIds = function (uri) {
        return this.decorations.get(typeof uri === 'string' ? uri : uri.toString()) || new Set();
    };
    MonacoSemanticHighlightingService.prototype.editor = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var editorWidget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editorManager.getByUri(typeof uri === 'string' ? new uri_1.default(uri) : uri)];
                    case 1:
                        editorWidget = _a.sent();
                        if (!!editorWidget && editorWidget.editor instanceof monaco_editor_1.MonacoEditor) {
                            return [2 /*return*/, editorWidget.editor];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    MonacoSemanticHighlightingService.prototype.model = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var editor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.editor(uri)];
                    case 1:
                        editor = _a.sent();
                        if (editor) {
                            return [2 /*return*/, editor.getControl().getModel() || undefined];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    /**
     * Returns all the semantic highlighting decoration IDs that are affected by any of the range arguments.
     */
    MonacoSemanticHighlightingService.prototype.oldDecorations = function (uri, editor, ranges) {
        var ids = this.decorationIds(uri);
        var affectedLines = Array.from(new Set(ranges.map(function (r) { return [r.start.line, r.end.line]; }).reduce(function (prev, curr) { return prev.concat(curr); }, [])));
        return affectedLines
            .map(function (line) { return editor.getLinesDecorations(line, line); })
            .reduce(function (prev, curr) { return prev.concat(curr); }, [])
            .map(function (decoration) { return decoration.id; })
            .filter(function (id) { return ids.has(id); });
    };
    MonacoSemanticHighlightingService.prototype.deleteDecorations = function (uri, editor) {
        var ids = this.decorations.get(uri);
        if (ids) {
            var oldDecorations = Array.from(ids);
            editor.deltaDecorations({
                newDecorations: [],
                oldDecorations: oldDecorations
            });
            this.decorations.delete(uri);
        }
        var disposable = this.toDisposeOnEditorClose.get(uri);
        if (disposable) {
            disposable.dispose();
        }
        this.toDisposeOnEditorClose.delete(uri);
    };
    MonacoSemanticHighlightingService.prototype.toDecoration = function (languageId, range) {
        var start = range.start, end = range.end;
        var options = this.toOptions(languageId, range.scope);
        return {
            range: semantic_highlighting_service_1.Range.create(start, end),
            options: options
        };
    };
    MonacoSemanticHighlightingService.prototype.toOptions = function (languageId, scope) {
        if (scope !== undefined) {
            var decorationTypes = this.decorationTypes.get(languageId);
            if (decorationTypes) {
                var decoration = decorationTypes.get(scope);
                if (decoration) {
                    return {
                        inlineClassName: decoration.options.inlineClassName || undefined
                    };
                }
            }
        }
        return {};
    };
    MonacoSemanticHighlightingService.prototype.themeService = function () {
        return monaco.services.StaticServices.standaloneThemeService.get();
    };
    MonacoSemanticHighlightingService.prototype.tokenTheme = function () {
        return this.themeService().getTheme().tokenTheme;
    };
    __decorate([
        inversify_1.inject(logger_1.ILogger),
        __metadata("design:type", Object)
    ], MonacoSemanticHighlightingService.prototype, "logger", void 0);
    __decorate([
        inversify_1.inject(editor_manager_1.EditorManager),
        __metadata("design:type", editor_manager_1.EditorManager)
    ], MonacoSemanticHighlightingService.prototype, "editorManager", void 0);
    __decorate([
        inversify_1.inject(monaco_editor_service_1.MonacoEditorService),
        __metadata("design:type", monaco_editor_service_1.MonacoEditorService)
    ], MonacoSemanticHighlightingService.prototype, "monacoEditorService", void 0);
    MonacoSemanticHighlightingService = __decorate([
        inversify_1.injectable()
    ], MonacoSemanticHighlightingService);
    return MonacoSemanticHighlightingService;
}(semantic_highlighting_service_1.SemanticHighlightingService));
exports.MonacoSemanticHighlightingService = MonacoSemanticHighlightingService;
//# sourceMappingURL=monaco-semantic-highlighting-service.js.map