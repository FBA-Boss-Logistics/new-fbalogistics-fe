export default function StarGernator({ length }) {
    return (
        <>
            {Array(length)
                .fill(0)
                // eslint-disable-next-line no-unused-vars
                .map((_) => (
                    <>*</>
                ))}
        </>
    );
}
