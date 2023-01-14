import { ComponentType, Suspense } from 'react'
import Preloader from '../components/common/Preloader/Preloader'

export function withSuspense<WCP extends object>(WrappedComponent: ComponentType<WCP>) {
	return (props: WCP) => {
		return (
			<Suspense fallback={<Preloader />}>
				<WrappedComponent {...props} />
			</Suspense>
		)
	}
}
