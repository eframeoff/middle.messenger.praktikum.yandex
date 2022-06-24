import {assert} from "chai"
import {Router} from "./Router"
import { JSDOM } from "jsdom";

const dom = new JSDOM('<!DOCTYPE html><div id="test"></div>');
(global as any).window = dom.window

const router = new Router('#test')

describe("Тестируем роутер", () => {
    it("Проверяем существование роутера", function() {
        assert.exists(router)
    });
    it("Роутер должен быть Синглтоном", () => {
        const router1 = new Router('#test');
        const router2 = new Router('#test');
        assert.equal(router1 instanceof Router, true, 'Создали экземпляр');
        assert.equal(router1, router2, 'Возвратили единственный экземпляр');

    })
    it("Проверяем регистрирование страниц", function() {
        router.use("/signin", `<div>Signin page</div>`)
        router.use("/sign-in", `<div>Signup page</div>`)
        router.use("/sign-in", `<div>Chat page</div>`);
        assert.lengthOf(router.routes, 3)
    })
})