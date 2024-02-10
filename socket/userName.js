"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _UserNames_randomNames, _UserNames_usedNames;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNames = void 0;
class UserNames {
    constructor() {
        _UserNames_randomNames.set(this, ['심심한 거북이', '무심한 호랑이', '눈물짓는 원숭이', '졸린 두루미']);
        _UserNames_usedNames.set(this, {});
        this.setUsedNames = (id, name) => {
            __classPrivateFieldSet(this, _UserNames_usedNames, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _UserNames_usedNames, "f")), { [id]: name }), "f");
        };
        this.getRandomName = ({ id }) => {
            const availableNames = __classPrivateFieldGet(this, _UserNames_randomNames, "f").filter(name => !Object.values(__classPrivateFieldGet(this, _UserNames_usedNames, "f")).includes(name));
            if (availableNames.length === 0) {
                throw new Error('모든 이름이 사용중');
            }
            const randomIndex = Math.floor(Math.random() * availableNames.length);
            const randomName = availableNames[randomIndex];
            this.setUsedNames(id, randomName);
            return randomName;
        };
        this.delUsedNames = ({ id }) => {
            delete __classPrivateFieldGet(this, _UserNames_usedNames, "f")[id];
        };
    }
}
exports.UserNames = UserNames;
_UserNames_randomNames = new WeakMap(), _UserNames_usedNames = new WeakMap();
