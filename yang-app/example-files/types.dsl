type InitializeParams {
	/**
	 * The process Id of the parent process that started
	 * the server. Is null if the process has not been started by another process.
	 * If the parent process is not alive then the server should exit (see exit notification) its process.
	 */
	processId?: number

	/**
	 * The rootPath of the workspace. Is null
	 * if no folder is open.
	 *
	 * @deprecated in favour of rootUri.
	 */
	rootPath?: string

	/**
	 * The rootUri of the workspace. Is null if no
	 * folder is open. If both `rootPath` and `rootUri` are set
	 * `rootUri` wins.
	 */
	rootUri?: string
}

type InitializeResult {
	/**
	 * The capabilities the language server provides.
	 */
	capabilities: ServerCapabilities
}


type ServerCapabilities {
	/**
	 * Defines how text documents are synced. Is either a detailed structure defining each notification or
	 * for backwards compatibility the TextDocumentSyncKind number.
	 */
	textDocumentSync?: number
	/**
	 * The server provides hover support.
	 */
	hoverProvider?: boolean
	/**
	 * The server provides goto definition support.
	 */
	definitionProvider?: boolean
	/**
	 * The server provides find references support.
	 */
	referencesProvider?: boolean
	/**
	 * The server provides document highlight support.
	 */
	documentHighlightProvider?: boolean
	/**
	 * The server provides document symbol support.
	 */
	documentSymbolProvider?: boolean
	/**
	 * The server provides workspace symbol support.
	 */
	workspaceSymbolProvider?: boolean
	/**
	 * The server provides code actions.
	 */
	codeActionProvider?: boolean
	/**
	 * The server provides document formatting.
	 */
	documentFormattingProvider?: boolean
	/**
	 * The server provides document range formatting.
	 */
	documentRangeFormattingProvider?: boolean
	/**
	 * The server provides rename support.
	 */
	renameProvider?: boolean
}