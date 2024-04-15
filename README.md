# Nanoly

O Nanoly é um projeto de um sistema de encurtar links, onde o usuário pode encurtar um link e compartilhar com outras pessoas, além de conferir a quantidade de acessos que o link encurtado recebeu.

## Requisitos Funcionais (RF's)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível encurtar um link;
- [ ] Deve ser possível acessar a quantidade de acessos de um link encurtado;
- [ ] Deve ser possível excluir um link encurtado;
- [ ] Deve ser possível editar um link encurtado.

## Regras de Negócio (RN's)

- [ ] O usuário não deve poder se cadastrar com um e-mail já cadastrado;
- [ ] O link encurtado deve ser único;
- [ ] O link encurtado deve conter no máximo 16 caracteres;
- [ ] O link encurtado deve conter pelo menos 4 caracteres;
- [ ] O link encurtado deve conter apenas caracteres alfanuméricos.

## Requisitos Não Funcionais (RNF's)

- [ ] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam ser armazenados em um banco de dados PostgreSQL;
- [ ] Todas as listas precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um token JWT.
