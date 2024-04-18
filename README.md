# Nanoly

O Nanoly é um projeto de um sistema de encurtar URL's, onde o usuário pode encurtar uma URL e compartilhar com outras pessoas, além de conferir a quantidade de acessos que a URL encurtada recebeu.

## Requisitos Funcionais (RF's)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível encurtar uma URL;
- [x] Deve ser possível acessar a quantidade de acessos de uma URL encurtada;
- [x] Deve ser possível excluir uma URL encurtada;
- [x] Deve ser possível editar uma URL encurtada.

## Regras de Negócio (RN's)

- [x] O usuário não deve poder se cadastrar com um e-mail já cadastrado;
- [x] A URL encurtada deve ser único;
- [ ] A URL encurtada deve conter no máximo 16 caracteres;
- [ ] A URL encurtada deve conter pelo menos 4 caracteres.

## Requisitos Não Funcionais (RNF's)

- [x] A senha do usuário deve ser criptografada;
- [ ] Os dados da aplicação precisam ser armazenados em um banco de dados PostgreSQL;
- [ ] Todas as listas precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um token JWT.
