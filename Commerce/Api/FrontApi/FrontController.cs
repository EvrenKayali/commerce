using Commerce.Api.BaseResponses;
using Commerce.Api.FrontApi.Query;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Api.FrontApi;

[Route("[controller]")]
public class FrontController : ControllerBase
{
    private readonly IMediator _mediator;
    public FrontController(IMediator mediator) => this._mediator = mediator;

    [HttpGet]
    public async Task<ActionResult<List<ProductBaseModel>>> GetProducts(CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetProducts.Request(), cancellationToken));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<List<ProductBaseModel>>> GetProduct([FromRoute] string slug, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetProduct.Request { Slug = slug }, cancellationToken));
    }
}