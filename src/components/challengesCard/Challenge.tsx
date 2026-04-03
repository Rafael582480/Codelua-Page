import Link from "next/link";

export interface ChallengeInfo {
    index: number,
    id: string,
    nome: string,
    descricao: string,
}

export function ChallengeCard({ id, nome, index, descricao }: ChallengeInfo) {

    return (
        <Link href={"challenges/" + id}>
            <div className="text-[var(--text-primary)] border-b border-[var(--border-color)] flex flex-col gap-3 p-3 hover:bg-[var(--card-color)] transition duration-300">
                <div className="flex gap-1">
                    <h1 className="font-bold text-lg">{index}:</h1>
                    <h1 className="font-bold text-lg">{nome}</h1>
                </div>
               <div className="line-clamp-3 text-[var(--text-secondary)]">
                 <p>{descricao}</p>
               </div>
            </div>
        </Link>
    );
}