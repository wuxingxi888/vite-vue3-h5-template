/**
 * @name configLegacyPlugin
 * @description es兼容性支持
 */
import legacyPlugin from "@vitejs/plugin-legacy"

export const configLegacyPlugin = () => {
    return legacyPlugin({
        targets: ["chrome 52"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        renderLegacyChunks: true,
        polyfills: [
            "es.symbol",
            "es.array.filter",
            "es.promise",
            "es.promise.finally",
            "es/map",
            "es/set",
            "es.array.for-each",
            "es.object.define-properties",
            "es.object.define-property",
            "es.object.get-own-property-descriptor",
            "es.object.get-own-property-descriptors",
            "es.object.keys",
            "es.object.to-string",
            "web.dom-collections.for-each",
            "esnext.global-this",
            "esnext.string.match-all"
        ]
    })
}
