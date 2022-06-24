import { assert } from "chai"
import Block from "./Block"
import { JSDOM } from "jsdom";

const dom = new JSDOM('<!DOCTYPE html><div id="test"></div>');
(global as any).window = dom.window;

describe('Тестируем компоненты', () => {
    it('Обновили элементы', () => {
        const oldData = {
            user: "Old"
        };
        const newData = {
            user: "New"
        }
        const block = new Block("div", oldData);
        block.setProps(newData);
        assert.equal(block?.props.user, "New", "Данные обновлены");
    });
    it('Скрытие элемент', () => {
        const data = {
            user: "test"
        };
        const block = new Block("div", data);
        block.show();
        block.hide();
        assert.equal(block._element.style.display, 'none')
    });
    it('Показали элемент', () => {
        const data = {
            user: "test"
        };
        const block = new Block("div", data);
        block.hide();
        block.show();
        assert.equal(block._element.style.display, 'block')
    })
})