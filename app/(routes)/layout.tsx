import Navbar from "@/components/navbar"

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {

    return (
        <div className="relative h-full w-full">
            <Navbar />
            <main className="h-full w-full mt-16">
                {children}
            </main>
        </div>
    )
}

export default MainLayout