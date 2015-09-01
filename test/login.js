// spec.js
var URL='http://127.0.0.1:5000/static/index.html';
var WAIT=3500;//TODO usar implicit wait
describe('Testa o login', function() {
  it('Usuário inativo', function() {
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('inativo@epicom.com.br');
    element(by.id('txtPassword')).sendKeys('password');
    element(by.id('btnEntrar')).click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(element(by.id('loginmessage')),'Esta conta está inativa, contate o seu administrador.'),WAIT);
  });
  it('Login com admin',function(){
    //TODO implementar banco antes
  });
  it('Login com usuário normal',function(){
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('user@epicom.com.br');
    element(by.id('txtPassword')).sendKeys('password');
    element(by.id('btnEntrar')).click();
    browser.sleep(1000);//chrome não espera o carregamento
    expect(browser.getCurrentUrl()).toContain('/painel');
    //TODO testar role
  })
  it('Formato de e-mail inválido',function(){
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('user');
    element(by.id('txtPassword')).sendKeys('password');
    expect(element(by.id('btnEntrar')).getAttribute('disabled')).toEqual('true');
  });
  it('Senha em branco',function(){
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('user@epicom.com.br');
    expect(element(by.id('btnEntrar')).getAttribute('disabled')).toEqual('true');
  });
  it('Usuário em branco',function(){
    browser.get(URL);
    element(by.id('txtPassword')).sendKeys('password');
    expect(element(by.id('btnEntrar')).getAttribute('disabled')).toEqual('true');
  });
  it('Usuário inexistente', function() {
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('naoexiste@epicom.com.br');
    element(by.id('txtPassword')).sendKeys('password');
    element(by.id('btnEntrar')).click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(element(by.id('loginmessage')),'E-mail ou senha inválida.'),WAIT);
  });
  it('Senha incorreta', function() {
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('user@epicom.com.br');
    element(by.id('txtPassword')).sendKeys('errado');
    element(by.id('btnEntrar')).click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(element(by.id('loginmessage')),'E-mail ou senha inválida.'),WAIT);
  });
});
