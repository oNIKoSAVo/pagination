import Head from "next/head";
import {Inter} from "next/font/google";
import Table from "react-bootstrap/Table";
import {Alert, Container} from "react-bootstrap";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

import { Pagination } from './Pagination/Pagination'
import { useHookPagination } from "./Pagination/useHookPagination";
import { useState } from "react";

const inter = Inter({subsets: ["latin"]});
const PAGE_SIZE = 20;

type TUserItem = {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  updatedAt: string
}

type TGetServerSideProps = {
  statusCode: number
  users: TUserItem[]
}

export function getRows(API_URL: any, page?: number) {
  return fetch(API_URL + (page ? `?page=${page}` : ''), {
      method: 'get',
      body: JSON.stringify({   
        page
      }),
  }).then(response => response.json())
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const page = ctx.query.page ? Number(ctx.query.page) : 1;
    const res = await fetch(`http://localhost:3000/users?page=${page}`);
    if (!res.ok) {
      return {props: {statusCode: res.status, users: []}}
    }

    return {
      props: {statusCode: 200, users: await res.json()}
    }
  } catch (e) {
    return {props: {statusCode: 500, users: []}}
  }
}) satisfies GetServerSideProps<TGetServerSideProps>


export default function Home({statusCode, users}: TGetServerSideProps) {
  if (statusCode !== 200) {
    return <Alert variant={'danger'}>Ошибка {statusCode} при загрузке данных</Alert>
  }

  const API_URL = "http://localhost:3000/users";
  const [loading, setLoading] = useState(true)
  
  const {
    state,
    page, setPage,
} = useHookPagination(
    (state: any, action: { type: string, data: any }) => {
        const { type, data } = action
        const ns = { ...state }
        switch (type) {
            case 'rows:set':
                const { items, pages, totalItems } = data
                ns.rows = items
                ns.pages = pages
                ns.totalItems = totalItems
                break
            default:
                break
        }
        return ns
    }, {
        rows: undefined,
        pages: undefined,
        totalItems: undefined,
    }, getRows, API_URL,
    loading, setLoading
)

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={'mb-5'}>Пользователи</h1>

          <Table striped bordered hover>
            <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Дата обновления</th>
            </tr>
            </thead>
            <tbody>
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))
            }
            </tbody>
          </Table>
 {/*TODO add pagination*/}
          <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                totalItems={state.totalItems}
                totalPages={state.pages}
                onChange={
                    (e) => {
                        setPage(e)
                        setLoading(true)
                    }
                }
            />
         

        </Container>
      </main>
    </>
  );
}
