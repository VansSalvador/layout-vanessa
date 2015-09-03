// spec.js
var BASEURL='http://127.0.0.1:5000/';
var LOGIN=BASEURL+'static/index.html';
describe('Testa o gerenciamento de usuários', function() {
  it('API: Acesso não-autorizado', function() {
     browser.driver.get(LOGIN);
     element(by.id('txtEmail')).sendKeys('user@epicom.com.br');
     element(by.id('txtPassword')).sendKeys('password');
     element(by.id('btnEntrar')).click();
     browser.sleep(1000);//chrome não espera o carregamento
     browser.driver.get(BASEURL+'api/listusers');
     expect(browser.driver.getTitle()).toEqual('401 Unauthorized');
  });
};