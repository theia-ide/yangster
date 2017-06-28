
/**
 * Language Server Protocol Definition
 */
protocol LanguageServer {

    /**
     * The initialize request is sent as the first request from the client to the server. If the server receives request or notification before the initialize request it should act as follows:
     * for a request the respond should be errored with code: -32002. The message can be picked by the server.
     * notifications should be dropped, except for the exit notification. This will allow the exit a server without an initialize request.
     * Until the server has responded to the initialize request with an InitializeResult the client must not sent any additional requests or notifications to the server.
     */
    request initialize(x: InitializeParams) : InitializeResult

}