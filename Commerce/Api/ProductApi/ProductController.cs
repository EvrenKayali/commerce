using Commerce.Api.BaseResponses;
using Commerce.Api.ProductApi.Command;
using Commerce.Api.ProductApi.Query;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Api.ProductApi;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProductController(IMediator mediator) => this._mediator = mediator;


    [HttpGet("/products")]
    public async Task<ActionResult<List<ProductBaseModel>>> GetProducts(CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetProducts.Request(), cancellationToken));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductFormModel>> GetProduct([FromRoute] int id, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(new GetProduct.Request { ProductId = id }, cancellationToken));
    }


    [HttpPost("add")]
    public async Task<IActionResult> AddWithImages([FromForm] AddProduct.Request request, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(request, cancellationToken));
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] UpdateProduct.Request request, CancellationToken cancellationToken)
    {
        return Ok(await _mediator.Send(request, cancellationToken));
    }
}