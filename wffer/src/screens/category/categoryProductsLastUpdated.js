<View style={gstyles.productsMain} key={index}>
					                    		<TouchableOpacity style={gstyles.flexDirectionRow} onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id})}}>
									          		<View style={gstyles.productsMainLeft}>
										          				<TouchableOpacity style={gstyles.productImageView} onPress={()=>{this.onCheckBoxPress(item.listing_id)}}>
										          					<Image source={{uri:item.image}} style={[gstyles.productImage,this.state.selectedCheckboxId.map((items)=>{ if(items == item.listing_id){ return ({opacity:0.5})}else{ return ({opacity:1})} })
										          						]} />
										          				</TouchableOpacity>
										          			
									          			<View style={gstyles.productViewRight}>
									          				<View style={gstyles.width100}>
									          					<TouchableOpacity onPress={()=>{this.props.navigation.push('ProductDetails',{product_id:item.listing_id})}}>
									          						<Text style={gstyles.productTitle}>{item.title}</Text>
									          					</TouchableOpacity>
									          				</View>
									          				<View>
									          				{
									          					this.state.categories.map((cat)=>{
									          						if(cat.category_id==item.category_id){
									          							return(
									          							<View style={gstyles.width100} key={cat.category_id}><Text style={gstyles.productCatTitle}>{cat.category_name}</Text></View>
									          							);
									          						}
									          					})
									          				}
											          		</View>
											          		<View style={gstyles.qtyView}>   
	          					
	          						
											          			<Text style={gstyles.qtyText}>{item.quantity}</Text>		
										                          <TouchableHighlight 
										                             onPress={() => this.increase_qty(item.listing_id)}
										                             underlayColor='#BEBEBE' style={gstyles.qtybuttonDecrease}>
										                             <Image source={require('../../../assets/plus.png')} style={gstyles.qtyIcon}/>
										                          </TouchableHighlight>
										                          
										                          <TouchableHighlight 
										                             onPress={() => this.decrease_qty(item.listing_id)}
										                             underlayColor='#BEBEBE' style={gstyles.qtybuttonIncrease}>
										                            <Image source={require('../../../assets/minus.png')} style={gstyles.qtyIcon}/>
										                          </TouchableHighlight>
										                    </View>
									          			</View>
									          		</View>
									          		<View style={gstyles.productsMainRight}><Icon color="#000" name="angle-right" size={30} style={gstyles.productsMainRightIcon} /></View>
								          		</TouchableOpacity>
								          		<View style={gstyles.productBottomPart}>
								          			<View style={gstyles.checkboxView}>
													          	<CheckBox label=' '
													          			  onChange={()=>this.onCheckBoxPress(item.listing_id)} /> 
												    </View>
								          			<View style={gstyles.bestDealView}>
						          						<Text style={gstyles.discountDeal}>Best Deal</Text>
										          		<Text style={gstyles.bestDeal}>{item.best_deal_title} : {item.best_deal_price} {item.currency} </Text>
										          	</View>
								          		</View>
									            
								        	</View>