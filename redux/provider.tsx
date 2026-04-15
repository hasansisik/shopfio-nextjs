"use client"

import { Provider } from "react-redux"
import store from "./store"
import { useEffect } from "react"
import { useAppDispatch } from "./hook"
import { loadUser } from "./actions/userActions"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthLoader>{children}</AuthLoader>
    </Provider>
  )
}

function AuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return <>{children}</>
}
