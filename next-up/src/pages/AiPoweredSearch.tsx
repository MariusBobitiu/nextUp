// type Props = {}

import AiForm from '@/components/AiForm'
import Loading from '@/components/layout/Loading'
import { Suspense } from 'react'

const AiPoweredSearch = () => {
  return (
    <main className="flex h-full w-full flex-col gap-4 overflow-hidden p-12">
      <Suspense fallback={<Loading />}>
        <div className="mb-4 w-full">
          <h1 className="text-center text-4xl font-bold">AI Powered Search</h1>
          <p className="text-center text-lg">
            Tell us what you like and we'll find the perfect movie for you!
          </p>
        </div>
        <div className="w-full">
          <AiForm />
        </div>
      </Suspense>
    </main>
  )
}

export default AiPoweredSearch
