import { FC, useState } from 'react'
import style from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
	totalItemsCount: number
	pageSize: number
	currentPage?: number
	portionSize?: number
	onPageChanged?: (pageNumber: number) => void
}
const Paginator: FC<PropsType> = ({ totalItemsCount, pageSize, currentPage = 1, onPageChanged = () => {}, portionSize = 20 }) => {
	const pagesCount = Math.ceil(totalItemsCount / pageSize)
	const pages: Array<number> = []
	const portionCount = Math.ceil(pagesCount / portionSize)
	const [portionNumber, setPortionNumber] = useState(1)
	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	const rightPortionPageNumber = portionNumber * portionSize
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}
	return (
		<div className={style.paginator}>
			{portionNumber > 1 && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber - 1)
					}}
				>
					PREV
				</button>
			)}
			{pages
				.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
				.map((p) => {
					return (
						<span
							className={cn({ [style.selectedPage]: currentPage === p }, style.pageNumber)}
							key={p}
							onClick={() => {
								onPageChanged(p)
							}}
						>
							{p}
						</span>
					)
				})}
			{portionCount > portionNumber && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber + 1)
					}}
				>
					NEXT
				</button>
			)}
		</div>
	)
}
export default Paginator
