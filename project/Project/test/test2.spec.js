test('toEqual with objects', () => {
    expect({foo: 'foo', subObject: {baz: 'baz'}}).toEqual({foo: 'foo', subObject: {baz: 'baz'}});
});

test('Equal with arrays', () => {
    expect([11, 19, 5]).toEqual([11,19,5]);
});

const arr = ['apple', 'orange', 'banana'];
expect(arr).toContain('banana');

expect([{a:1}, {b:2}]).toContainEqual({a:1});

expect('Banana').toMatch(/Ba/);

//Throw

function fonctionWithError() {
    throw new Error('some error');
}

expect(functionWithError).toThrow(); //сам факт ошибки
expect(functionWithError).toThrow(Error); //выброс исключения
expect(functionWithError).toThrow('some error'); //сообщение ошибки
expect(functionWithError).toThrow(/some/); //соответствие регулярке

//пример not
expect(true).not.toBe(false);
expect(functionWithError).not.toThrow();


//проверка возвращения значения функции
test('drink returns La Croix', () => {
    const beverage = {name: 'La Croix'};
    const drink = jest.fn(beverage => beverage.name);

    drink(beverage);

    expect(drink).toHaveReturnedWith('La Croix');
});

//проверка наличия свойства
const houseForSale = {
    bath: true,
    bedrooms: 4,
    kitchen: {
        amenities: ['oven', 'stove', 'washer'],
        area: 20,
        wallColor: 'white',
        'nice.oven': true,
    },
    'ceiling.height': 2,
};

expect(houseForSale).not.toHaveProperty('pool');
expect(houseForSale).toHaveProperty('kitchen.area', 20);
expect(houseForSale).toHaveProperty('kitchen.amenities', [
    'oven',
    'stove',
    'wacher',
]);
