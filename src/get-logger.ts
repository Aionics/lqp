import debug from 'debug'

type LoggerFunc = (str: string, ...args: any[]) => void

type Logger = {
    info: LoggerFunc
    warn: LoggerFunc
    error: LoggerFunc
}

/**
 * @See https://github.com/visionmedia/debug
 * @param namespace
 */
export function getLogger(namespace: string): Logger {
    const paddedNamespace = namespace.padEnd(7, ' ')
    const infoNs = `lqp:info:${paddedNamespace}`
    const warnNs = `lqp:warn:${paddedNamespace}`
    const errorNs = `lqp:error:${paddedNamespace}`
    return {
        info: debug(infoNs),
        warn: debug(warnNs),
        error: debug(errorNs)
    }
}
