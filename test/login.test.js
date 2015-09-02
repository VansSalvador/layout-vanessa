// spec.js
//TODO testar logout em todos os usuários?
var BASEURL='http://127.0.0.1:5000/';
var URL=BASEURL+'static/index.html';
var WAIT=5000;//TODO usar implicit wai

describe('Testa o login', function() {
  it('Login com usuário normal',function(){
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('user@epicom.com.br');
    element(by.id('txtPassword')).sendKeys('password');
    element(by.id('btnEntrar')).click();
    browser.sleep(1000);//chrome não espera o carregamento
    expect(browser.driver.getCurrentUrl()).toContain('/painel');
    //TODO testar role
    browser.driver.get(BASEURL+'logoff');
    expect(browser.driver.getCurrentUrl()).toContain('/static/index.html');//TODO change url
  });
  it('Usuário inativo', function() {
    browser.get(URL);
    element(by.id('txtEmail')).sendKeys('inativo@epicom.com.br');
    element(by.id('txtPassword')).sendKeys('password');
    element(by.id('btnEntrar')).click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(element(by.id('loginmessage')),'Esta conta está inativa, contate o seu administrador.'),WAIT);
  });
  it('Acesso não-autorizado', function() {
     browser.driver.get(BASEURL+'painel');
     expect(browser.driver.getTitle()).toEqual('401 Unauthorized');
  });
  it('Login com admin',function(){
    //TODO
  });
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
