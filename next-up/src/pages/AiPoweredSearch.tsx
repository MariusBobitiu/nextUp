// type Props = {}

import AiForm from '@/components/AiForm'
import Loading from '@/components/layout/Loading'
import { Suspense } from 'react'

const AiPoweredSearch = () => {
  return (
    <>
      <main className="flex h-full w-full flex-col gap-4 overflow-hidden p-12">
        <Suspense fallback={<Loading />}>
          <div className="mb-4 w-full">
            <h1 className="text-center text-4xl font-bold">
              AI Powered Search
            </h1>
            <p className="text-center text-lg">
              Tell us what you like and we'll find the perfect movie for you!
            </p>
          </div>
          <div className="w-full">
            <AiForm />
          </div>
        </Suspense>
      </main>

      <div className="absolute left-0 top-0 z-40 flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-navy-800 to-navy-700">
        <h1>
          This feature is currently under development. Please check back later!
        </h1>
      </div>
    </>
  )
}

export default AiPoweredSearch
