describe('piechart', function() {
    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('http://localhost:9000');
    });

    it('should display the total number of people who are testing their angular apps', function() {
        var unit = ptor.findElement(protractor.By.input("unit"));
        var e2e = ptor.findElement(protractor.By.input("e2e"));
        var both = ptor.findElement(protractor.By.input("both"));

        unit.sendKeys('2');
        expect(ptor.findElement(protractor.By.binding('total')).getText()).toEqual('Total: 2 people');

        e2e.sendKeys('3');
        expect(ptor.findElement(protractor.By.binding('total')).getText()).toEqual('Total: 5 people');

        both.sendKeys('5');
        expect(ptor.findElement(protractor.By.binding('total')).getText()).toEqual('Total: 10 people');
    });
});