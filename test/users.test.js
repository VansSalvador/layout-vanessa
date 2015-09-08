// spec.js
var BASEURL='http://127.0.0.1:5000/';
var LOGIN=BASEURL+'static/index.html';
var WAIT=5000;
function fillpass(){
    element(by.id('password')).sendKeys('senha');
    element(by.id('password_confirm')).sendKeys('senha');
}
describe('Testa o gerenciamento de usuários', function() {
  it('Login com admin',function(){
    browser.get(LOGIN);
    element(by.id('txtEmail')).sendKeys('admin@epicom.com.br');
    element(by.id('txtPassword')).sendKeys('password');
    element(by.id('btnEntrar')).click();
    browser.sleep(1000);//chrome não espera o carregamento
    expect(browser.driver.getCurrentUrl()).toContain('/painel');
    browser.get(BASEURL+'static/usuarios.html');
  });
  it('Cria usuário',function(){
    element(by.id('adduserbtn')).click();
    element(by.id('user')).sendKeys('Novo');
    element(by.id('email')).sendKeys('novo@epicom.com.br');
    element(by.id('roleoptionuser')).click();
    fillpass();
    element(by.id('btnSave')).click();
    browser.findElements(by.css('table.users tr')).then(function(trs){
        expect(trs[trs.length-1].getText()).toContain('novo@epicom.com.br');
    });
  });
  it('Atualiza usuário',function(){
    browser.findElements(by.css('.editUser')).then(function(trs){
        trs[trs.length-1].click();
    });
    element(by.id('email')).clear();
    element(by.id('email')).sendKeys('novo2@epicom.com.br');
    fillpass();
    element(by.id('btnSave')).click();
    browser.findElements(by.css('.userline')).then(function(trs){
        var lastline=trs[trs.length-1];
        expect(lastline.getText()).toContain('novo2@epicom.com.br');
        expect(lastline.getText()).not.toContain('novo@epicom.com.br');
    });
  });
  it('Remove usuário',function(){
    browser.findElements(by.css('.deleteUser')).then(function(trs){
        trs[trs.length-1].click();
    });
    element(by.id('confirmdelete')).click();
    browser.findElements(by.css('.userline')).then(function(trs){
        var lastline=trs[trs.length-1];
        expect(lastline.getText()).not.toContain('novo2@epicom.com.br');
        expect(lastline.getText()).not.toContain('novo@epicom.com.br');
    });
  });
  it('Atualiza usuário antigo',function(){
    browser.findElements(by.css('.editUser')).then(function(trs){
        trs[trs.length-1].click();
    });
    element(by.id('email')).clear();
    element(by.id('email')).sendKeys('novo@epicom.com.br');
    fillpass();
    element(by.id('btnSave')).click();
    browser.findElements(by.css('.creationdate')).then(function(trs){
        var lastline=trs[trs.length-1];
        expect(lastline.getAttribute("created")).toEqual('1');
    });
  });
  it('Tenta criar usuário com e-mail existente em outra empresa',function(){
    browser.findElements(by.css('.editUser')).then(function(trs){
        trs[trs.length-1].click();
    });
    element(by.id('email')).clear();
    element(by.id('email')).sendKeys('papaleguas@acme.com');
    fillpass();
    element(by.id('btnSave')).click();
    //browser.sleep(5000);//TODO
    expect(element(by.id('errormessage')).getText()).toContain('Escolha outro endereço de e-mail.');
  });
});