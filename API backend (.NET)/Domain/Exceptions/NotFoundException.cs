namespace Domain.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string entity, int id)
            : base($"{entity} con Id {id} no fue encontrado.") { }
    }
}