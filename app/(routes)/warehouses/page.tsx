"use client"
import { useData } from '@/components/providers/content-provider'
import WarehouseCard from '@/components/warehouse-card'
import { warehouses } from '@/data'

const MainPage = () => {

    const { user } = useData();


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                {

                    warehouses.map((item) => (
                        <WarehouseCard
                            key={item.id}
                            data={item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MainPage