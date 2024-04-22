# Nanoly

O Nanoly é um projeto de um sistema de encurtar Url's, onde o usuário pode encurtar uma Url e compartilhar com outras pessoas, além de conferir a quantidade de acessos que a Url encurtada recebeu.

## Requisitos Funcionais (RF's)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível encurtar uma Url;
- [x] Deve ser possível acessar a quantidade de acessos de uma Url encurtada;
- [x] Deve ser possível excluir uma Url encurtada;
- [x] Deve ser possível editar uma Url encurtada.

## Regras de Negócio (RN's)

- [x] O usuário não deve poder se cadastrar com um e-mail já cadastrado;
- [x] A Url encurtada deve ser único;
- [ ] A Url encurtada deve conter no máximo 16 caracteres;
- [ ] A Url encurtada deve conter pelo menos 4 caracteres.

## Requisitos Não Funcionais (RNF's)

- [x] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam ser armazenados em um banco de dados PostgreSQL;
- [ ] Todas as listas precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um token JWT.
